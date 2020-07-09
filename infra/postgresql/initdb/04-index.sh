psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_DATABASE" <<-EOSQL
CREATE INDEX "IDX_5e91740c2938a9da00058304db" ON public.users_establishments USING btree ("establishmentsId" ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX "IDX_63dea19e6502a5f53c75df8af9" ON public.users_establishments USING btree ("usersId" ASC NULLS LAST) TABLESPACE pg_default;
CREATE INDEX "IDX_4b524f90163dedb1c8beb4914a" ON public.roles_resources USING btree ("resourcesId" ASC NULLS LAST) TABLESPACE pg_default; CREATE INDEX "IDX_d8b394f8480c23ef5ddde9607f" ON public.roles_resources USING btree ("rolesId" ASC NULLS LAST) TABLESPACE pg_default;
EOSQL
