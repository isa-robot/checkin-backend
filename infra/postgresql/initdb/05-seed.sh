set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_DATABASE" --set "$ESTABLISHMENT_NAME" --set "$ESTABLISHMENT_EMAIL" --set "$ESTABLISHMENT_CNPJ" --set "$ESTABLISHMENT_PHONE" --set "$ESTABLISHMENT_CITY" <<-EOSQL
    INSERT INTO public.resources(name, "to", icon) VALUES ('Monitoramento', '/monitoramento', 'monitoring');
    INSERT INTO public.resources(name, "to", icon) VALUES ('Diário', '/diario', 'diary');
    INSERT INTO public.resources(name, "to", icon) VALUES ('Painel', '/painel', 'monitoring');
    INSERT INTO public.resources(name, "to", icon) VALUES ('Cadastros', '/cadastros', 'register');

    INSERT INTO public.roles(name) VALUES ('Administrador');
    INSERT INTO public.roles(name) VALUES ('Responsável');
    INSERT INTO public.roles(name) VALUES ('Infectologista');
    INSERT INTO public.roles(name) VALUES ('Assistido');

    INSERT INTO public.establishments(name, email, cnpj, phone, city, active) VALUES ('$ESTABLISHMENT_NAME', '$ESTABLISHMENT_EMAIL', '$ESTABLISHMENT_CNPJ','$ESTABLISHMENT_PHONE', '$ESTABLISHMENT_CITY', true);

    INSERT INTO public.statistic_types(name) VALUES ('Aprovados');
    INSERT INTO public.statistic_types(name) VALUES ('Não Aprovados');
    INSERT INTO public.statistic_types(name) VALUES ('Adesão');
    INSERT INTO public.statistic_types(name) VALUES ('Perda de olfato');
    INSERT INTO public.statistic_types(name) VALUES ('Perda de paladar');
    INSERT INTO public.statistic_types(name) VALUES ('Perda de apetite');
    INSERT INTO public.statistic_types(name) VALUES ('Cansaço');
    INSERT INTO public.statistic_types(name) VALUES ('Febre');
    INSERT INTO public.statistic_types(name) VALUES ('Tosse persistente');
    INSERT INTO public.statistic_types(name) VALUES ('Diarréia');
    INSERT INTO public.statistic_types(name) VALUES ('Delírios');
    INSERT INTO public.statistic_types(name) VALUES ('Rouquidão');
    INSERT INTO public.statistic_types(name) VALUES ('Falta de ar');
    INSERT INTO public.statistic_types(name) VALUES ('Dor abdominal');
    INSERT INTO public.statistic_types(name) VALUES ('Dor torácica');
    INSERT INTO public.statistic_types(name) VALUES ('Total aprovados');
    INSERT INTO public.statistic_types(name) VALUES ('Total não aprovados');
    INSERT INTO public.statistic_types(name) VALUES ('Adesão total');
    INSERT INTO public.statistic_types(name) VALUES ('Total dor torácica');
    INSERT INTO public.statistic_types(name) VALUES ('Total dor abdominal');
    INSERT INTO public.statistic_types(name) VALUES ('Total falta de ar');
    INSERT INTO public.statistic_types(name) VALUES ('Total rouquidão');
    INSERT INTO public.statistic_types(name) VALUES ('Total delírios');
    INSERT INTO public.statistic_types(name) VALUES ('Total diarréia');
    INSERT INTO public.statistic_types(name) VALUES ('Total tosse persistente');
    INSERT INTO public.statistic_types(name) VALUES ('Total febre');
    INSERT INTO public.statistic_types(name) VALUES ('Total cansaço');
    INSERT INTO public.statistic_types(name) VALUES ('Total perda de apetite');
    INSERT INTO public.statistic_types(name) VALUES ('Total perda de paladar');
    INSERT INTO public.statistic_types(name) VALUES ('Total perda de olfato');
    INSERT INTO public.statistic_types(name) VALUES ('Usuários adesão total');
    INSERT INTO public.statistic_types(name) VALUES ('Usuários adesão');

    INSERT INTO public.users(name, username, password, email, phone, cpf, "roleId")	VALUES ('Admin', 'admin', 'admin', 'admin@admin.com.br', '(55)123456789', '675.719.457-04', (SELECT id from public.roles WHERE name='Administrador'));
EOSQL
