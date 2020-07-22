psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_DATABASE" <<-EOSQL
CREATE OR REPLACE FUNCTION public.uuid_generate_v4( ) RETURNS uuid LANGUAGE 'c' COST 1 VOLATILE STRICT PARALLEL SAFE AS 'uuid-ossp', 'uuid_generate_v4' ; ALTER FUNCTION public.uuid_generate_v4() OWNER TO postgres;
EOSQL
