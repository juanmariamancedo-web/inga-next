CREATE TABLE users (
    user_id serial PRIMARY KEY,
    google_user_id VARCHAR(255) UNIQUE NOT NULL,
    google_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    avatar_url VARCHAR(255),
    creation_date TIMESTAMP DEFAULT current_timestamp
);

create table accounts (
    account_id serial primary key,
    title VARCHAR(50) not null unique,
    description text,
    user_id integer references users(user_id)
);

CREATE TYPE type_of_transaction AS ENUM ('expense', 'income');

create table categories_transactions (
	category_transaction_id serial primary key,
	title text not null,
    type_of_transaction type_of_transaction,
    user_id integer references users(user_id) not null
);

create table transactions (
	transaction_id serial primary key,
	amount integer not null,
	description text not null,
	type_of_transaction type_of_transaction not null,
    finish boolean not null,
	account_id integer references accounts(account_id) not null,
	category_transaction_id integer references categories_transactions(category_transaction_id)
);

CREATE OR REPLACE FUNCTION check_type_match_of_transaction_and_category()
RETURNS TRIGGER AS $$
BEGIN
     IF NEW.type_of_transaction != (SELECT type_of_transaction FROM categories_transactions WHERE category_transaction_id = NEW.category_transaction_id) THEN
        RAISE EXCEPTION 'Type mismatch between transaction and category';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER check_type_match_of_transaction_and_category
BEFORE INSERT OR UPDATE
ON transactions
FOR EACH ROW
EXECUTE FUNCTION check_type_match_of_transaction_and_category();

CREATE OR REPLACE FUNCTION before_account_delete()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM transactions WHERE account_id = OLD.account_id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_account_delete
BEFORE DELETE ON accounts
FOR EACH ROW
EXECUTE FUNCTION before_account_delete();

CREATE OR REPLACE FUNCTION before_delete_category()
RETURNS TRIGGER AS $$
    BEGIN
        IF old.title = 'Otros' THEN
            RAISE EXCEPTION 'The category whith title "otros" can not delected';
        END IF;
        return old;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_delete_category
before DELETE ON categories_transactions
FOR EACH ROW
EXECUTE FUNCTION before_delete_category();

CREATE OR REPLACE FUNCTION before_update_category()
RETURNS TRIGGER AS $$
DECLARE
category_count INTEGER;
    BEGIN
        SELECT COUNT(*)
        INTO category_count
        FROM categories_transactions
        WHERE title = NEW.title
            AND user_id = NEW.user_id;

        IF category_count > 0 THEN
            RAISE EXCEPTION 'The category title is unique';
        ELSEIF old.title = 'Otros' THEN
            RAISE EXCEPTION 'You cannot change the category title "Otros"';
        END IF;

        return new;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_update_category
BEFORE UPDATE ON categories_transactions
FOR EACH ROW
WHEN (OLD.title IS DISTINCT FROM NEW.title OR OLD.user_id IS DISTINCT FROM NEW.user_id)
EXECUTE FUNCTION before_update_category();

CREATE OR REPLACE FUNCTION after_update_category()
RETURNS TRIGGER AS $$
    BEGIN
        IF old.title = 'Otros' THEN
            RAISE EXCEPTION 'The category whith title "otros" can not changed';
        END IF;
        return new;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_update_category
after UPDATE ON categories_transactions
FOR EACH ROW
EXECUTE FUNCTION after_update_category();

CREATE OR REPLACE FUNCTION after_delete_category()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE transactions set category_transaction_id = null where category_transaction_id = old.category_transaction_id;
    return new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_delete_category
after DELETE ON categories_transactions
FOR EACH ROW
EXECUTE FUNCTION after_delete_category();

CREATE OR REPLACE FUNCTION after_insert_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT into categories_transactions(title, type_of_transaction, user_id)
    values('Inversiones', 'income', new.user_id),
        ('Premios', 'income', new.user_id),
        ('Regalos', 'income', new.user_id),
        ('Salario', 'income', new.user_id),
        ('Otros', 'income', new.user_id),
        ('Donaciones', 'expense', new.user_id),
        ('Educación', 'expense', new.user_id),
        ('Electrónicos', 'expense', new.user_id),
        ('Recreación', 'expense', new.user_id),
        ('Restaurante', 'expense', new.user_id),
        ('Ropa', 'expense', new.user_id),
        ('Salud', 'expense', new.user_id),
        ('Servicios', 'expense', new.user_id),
        ('Supermercado', 'expense', new.user_id),
        ('Transporte', 'expense', new.user_id),
        ('Viaje', 'expense', new.user_id),
        ('Vivienda', 'expense', new.user_id),
        ('Otros', 'expense', new.user_id);
    return new;
END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER after_insert_user
after INSERT
ON users
FOR EACH ROW
EXECUTE FUNCTION after_insert_user();

CREATE OR REPLACE FUNCTION before_delete_user()
RETURNS TRIGGER AS $$
BEGIN
    delete from accounts where user_id = old.user_id;
    delete from categories_transactions where user_id = old.user_id;
    return old;
END;
$$ LANGUAGE plpgsql;

CREATE or replace TRIGGER before_delete_user
BEFORE delete
ON users
FOR EACH ROW
EXECUTE FUNCTION before_delete_user();

create view users_balances as SELECT users.user_id,
	COALESCE(SUM(CASE WHEN transactions.type_of_transaction = 'income' THEN transactions.amount ELSE 0 END))AS total_income,
	COALESCE(SUM(CASE WHEN transactions.type_of_transaction = 'expense' THEN transactions.amount ELSE 0 END)) AS total_expense,
  	COALESCE(SUM(CASE WHEN transactions.type_of_transaction = 'income' THEN transactions.amount ELSE 0 END)) -
  	COALESCE(SUM(CASE WHEN transactions.type_of_transaction = 'expense' THEN transactions.amount ELSE 0 END)) AS balance
	from users
		left join accounts
		on accounts.user_id = users.user_id
		left join transactions
		on transactions.account_id = accounts.account_id
group by users.user_id;

CREATE VIEW accounts_balances AS
SELECT
    accounts.account_id,
    accounts.title,
    accounts.description,
    COALESCE(SUM(CASE WHEN transactions.type_of_transaction = 'income' THEN transactions.amount ELSE 0 END), 0) AS total_income,
    COALESCE(SUM(CASE WHEN transactions.type_of_transaction = 'expense' THEN transactions.amount ELSE 0 END), 0) AS total_expense,
    COALESCE(SUM(CASE WHEN transactions.type_of_transaction = 'income' THEN transactions.amount ELSE 0 END), 0) -
    COALESCE(SUM(CASE WHEN transactions.type_of_transaction = 'expense' THEN transactions.amount ELSE 0 END), 0) AS balance
FROM
    accounts
LEFT JOIN
    transactions ON transactions.account_id = accounts.account_id
GROUP BY
    accounts.account_id, accounts.title, accounts.description;