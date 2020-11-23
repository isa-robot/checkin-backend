psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$DB_DATABASE" <<-EOSQL
CREATE TYPE public.baselines_genre_enum AS ENUM ('M', 'F'); ALTER TYPE public.baselines_genre_enum OWNER TO postgres;
CREATE TYPE public.baselines_race_enum AS ENUM ('M', 'B', 'W'); ALTER TYPE public.baselines_race_enum OWNER TO postgres;
CREATE TYPE public.baselines_student_grade_enum AS ENUM ('Primeira serie', 'Segunda serie', 'Terceira serie', 'Quarta serie', 'Quinta serie', 'Sexta serie', 'Setima serie', 'Oitava serie', 'Nona serie', 'Primeiro ano', 'Segundo ano', 'Terceiro ano'); ALTER TYPE public.baselines_student_grade_enum OWNER TO postgres;


CREATE TABLE public.roles ( id uuid NOT NULL DEFAULT uuid_generate_v4(), name character varying COLLATE pg_catalog."default" NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id) ); ALTER TABLE public.roles OWNER to postgres;
CREATE TABLE public.users ( id uuid NOT NULL DEFAULT uuid_generate_v4(), name character varying COLLATE pg_catalog."default" NOT NULL, username character varying COLLATE pg_catalog."default" NOT NULL, password character varying COLLATE pg_catalog."default" NOT NULL, email character varying COLLATE pg_catalog."default" NOT NULL, phone character varying COLLATE pg_catalog."default" NOT NULL, cpf character varying COLLATE pg_catalog."default" NOT NULL, "roleId" uuid NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id), CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES public.roles (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION ); ALTER TABLE public.users OWNER to postgres;
CREATE TABLE public.baselines ( id uuid NOT NULL DEFAULT uuid_generate_v4(), age integer NOT NULL, genre baselines_genre_enum NOT NULL, race baselines_race_enum NOT NULL, weight numeric NOT NULL, height numeric NOT NULL, city character varying COLLATE pg_catalog."default" NOT NULL, recent_appointments boolean NOT NULL, contact_covid19 boolean NOT NULL, mask boolean NOT NULL, occupation character varying COLLATE pg_catalog."default" NOT NULL, occupation_local character varying COLLATE pg_catalog."default" NOT NULL, hypertension boolean NOT NULL, diabetes boolean NOT NULL, heart_disease boolean NOT NULL, lung_disease boolean NOT NULL, asthma boolean NOT NULL, smoking boolean NOT NULL, kidney_disease boolean NOT NULL, cancer boolean NOT NULL, corticosteroids_or_methotrexate boolean NOT NULL, gestation boolean NOT NULL, "userId" character varying COLLATE pg_catalog."default" NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now()); ALTER TABLE public.baselines OWNER to postgres;
CREATE TABLE public.diaries ( id uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_4b524f90163dedb1c8beb4915a5" PRIMARY KEY (id),"smellLoss" boolean NOT NULL, "tasteLoss" boolean NOT NULL, "appetiteLoss" boolean NOT NULL, fatigue boolean NOT NULL, fever boolean NOT NULL, cough boolean NOT NULL, diarrhea boolean NOT NULL, delirium boolean NOT NULL, "soreThroat" boolean NOT NULL, "shortnessOfBreath" boolean NOT NULL, "abdominalPain" boolean NOT NULL, "chestPain" boolean NOT NULL, approved boolean NOT NULL, "userId" character varying COLLATE pg_catalog."default" NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now()); ALTER TABLE public.diaries OWNER to postgres;
CREATE TABLE public.establishments ( id uuid NOT NULL DEFAULT uuid_generate_v4(), name character varying COLLATE pg_catalog."default" NOT NULL, email character varying COLLATE pg_catalog."default" NOT NULL, cnpj character varying COLLATE pg_catalog."default" NOT NULL, phone character varying COLLATE pg_catalog."default" NOT NULL, city character varying COLLATE pg_catalog."default" NOT NULL, active boolean NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now(), CONSTRAINT "PK_7fb6da6c365114ccb61b091bbdf" PRIMARY KEY (id) ); ALTER TABLE public.establishments OWNER to postgres;
CREATE TABLE public.resources ( id uuid NOT NULL DEFAULT uuid_generate_v4(), name character varying COLLATE pg_catalog."default" NOT NULL, "to" character varying COLLATE pg_catalog."default" NOT NULL, icon character varying COLLATE pg_catalog."default" NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now(), CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY (id) ); ALTER TABLE public.resources OWNER to postgres;
CREATE TABLE public.roles_resources ( "rolesId" uuid NOT NULL, "resourcesId" uuid NOT NULL, CONSTRAINT "PK_6f150c547e2e7214cffe8dbd9e4" PRIMARY KEY ("rolesId", "resourcesId"), CONSTRAINT "FK_4b524f90163dedb1c8beb4914ac" FOREIGN KEY ("resourcesId") REFERENCES public.resources (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "FK_d8b394f8480c23ef5ddde9607fe" FOREIGN KEY ("rolesId") REFERENCES public.roles (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE ); ALTER TABLE public.roles_resources OWNER to postgres;
CREATE TABLE public.statistic_types ( id uuid NOT NULL DEFAULT uuid_generate_v4(), name character varying COLLATE pg_catalog."default" NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now(), CONSTRAINT "PK_b0df9f8ecd1884efe9de6dff57c" PRIMARY KEY (id) ); ALTER TABLE public.statistic_types OWNER to postgres;
CREATE TABLE public.statistics ( id uuid NOT NULL DEFAULT uuid_generate_v4(), value numeric NOT NULL, "statisticTypeId" uuid NOT NULL, "establishmentId" uuid NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now(), CONSTRAINT "PK_c3769cca342381fa827a0f246a7" PRIMARY KEY (id), CONSTRAINT "FK_69b4ea3e8f6deac0fc4dc6a9e78" FOREIGN KEY ("statisticTypeId") REFERENCES public.statistic_types (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION, CONSTRAINT "FK_9147df80cc822ce1e4b0db81cc7" FOREIGN KEY ("establishmentId") REFERENCES public.establishments (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION ); ALTER TABLE public.statistics OWNER to postgres;
CREATE TABLE public.tokens ( id uuid NOT NULL DEFAULT uuid_generate_v4(), token uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now(), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY (id), CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES public.users (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION ); ALTER TABLE public.tokens OWNER to postgres;
CREATE TABLE public.users_establishments ( "usersId" character varying COLLATE pg_catalog."default" NOT NULL, "establishmentsId" uuid NOT NULL, CONSTRAINT "PK_fa49abe51e3d27b550820f37ad8" PRIMARY KEY ("establishmentsId"), CONSTRAINT "FK_5e91740c2938a9da00058304db8" FOREIGN KEY ("establishmentsId") REFERENCES public.establishments (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE); ALTER TABLE public.users_establishments OWNER to postgres;
CREATE TABLE public.mailer_ethereal ( id uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying COLLATE pg_catalog."default" NOT NULL, "host" character varying COLLATE pg_catalog."default" NOT NULL, port integer NOT NULL, "user" character varying COLLATE pg_catalog."default" NOT NULL, "pass" character varying COLLATE pg_catalog."default" NOT NULL, "name" character varying COLLATE pg_catalog."default", "address" character varying COLLATE pg_catalog."default", created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now());ALTER TABLE public.mailer_ethereal OWNER to postgres;
CREATE TABLE public.mailer_ses ( id uuid NOT NULL DEFAULT uuid_generate_v4(), "type" character varying COLLATE pg_catalog."default" NOT NULL, "accessKeyId" character varying COLLATE pg_catalog."default" NOT NULL, "secretAccessKey" character varying COLLATE pg_catalog."default" NOT NULL, region character varying COLLATE pg_catalog."default" NOT NULL, "name" character varying COLLATE pg_catalog."default", "address" character varying COLLATE pg_catalog."default", created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now()); ALTER TABLE public.mailer_ses OWNER to postgres;
CREATE TABLE public.mailer_destinataries ( id uuid NOT NULL DEFAULT uuid_generate_v4(), "destinatary_type" character varying COLLATE pg_catalog."default" NOT NULL, "name" character varying COLLATE pg_catalog."default" NOT NULL, "address" character varying COLLATE pg_catalog."default" NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now()); ALTER TABLE public.mailer_destinataries OWNER to postgres;
CREATE TABLE public.sms ( id uuid NOT NULL DEFAULT uuid_generate_v4(), "zenviaSecretKey" character varying COLLATE pg_catalog."default" NOT NULL, "chanel" character varying COLLATE pg_catalog."default" NOT NULL, "from" character varying COLLATE pg_catalog."default" NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now()); ALTER TABLE public.sms OWNER to postgres;
CREATE TABLE public.protocol ( id uuid NOT NULL DEFAULT uuid_generate_v4(), "diaryId" uuid NOT NULL, CONSTRAINT "PK_6f150c547e2e7214cffe8dbd7e6" PRIMARY KEY ("id"), CONSTRAINT "FK_4b524f90163dedb1c8beb4915a5" FOREIGN KEY ("diaryId") REFERENCES public.diaries (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE, "userId" character varying COLLATE pg_catalog."default" NOT NULL,  "protocolName" character varying COLLATE pg_catalog."default" NOT NULL, "active" boolean NOT NULL, "protocolEndDate" timestamp without time zone NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now()); ALTER TABLE public.protocol OWNER to postgres;
CREATE TABLE public.protocol_cfpng ( id uuid NOT NULL DEFAULT uuid_generate_v4(), "breathLess" boolean NOT NULL, "breathDifficulty" boolean NOT NULL, "chestTightness" boolean NOT NULL, "breathPressure" boolean NOT NULL, "mentalConfusion" boolean NOT NULL, "dizziness" boolean NOT NULL, "draggedVoice" boolean NOT NULL, "awakeDifficulty" boolean NOT NULL, "blueSkin" boolean NOT NULL, "lowPressure" boolean NOT NULL, "pallor" boolean NOT NULL,"sweating" boolean NOT NULL ,"oximetry" boolean NOT NULL, "extraSymptom" boolean NOT NULL,"newSymptom" character varying COLLATE pg_catalog."default", "approved" boolean NOT NULL, "protocolGenerationDate"  timestamp without time zone NOT NULL, "protocolId" uuid NOT NULL, "userId" character varying COLLATE pg_catalog."default" NOT NULL, CONSTRAINT "FK_6f150c547e2e7214cffe8dbd7e6" FOREIGN KEY ("protocolId") REFERENCES public.protocol (id) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE NO ACTION,  created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now()); ALTER TABLE public.protocol_cfpng OWNER to postgres;
CREATE TABLE public.protocol_list ( id uuid NOT NULL DEFAULT uuid_generate_v4(), "protocolName" character varying COLLATE pg_catalog."default" NOT NULL, "period" integer NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now()); ALTER TABLE public.protocol_list OWNER to postgres;
CREATE TABLE public.user_terms ( id uuid NOT NULL DEFAULT uuid_generate_v4(), "personalKidDataTerm" boolean NOT NULL, "responsabilityTerm" boolean NOT NULL, "canUseTheSystem" boolean NOT NULL, "userId" character varying COLLATE pg_catalog."default" NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now()); ALTER TABLE public.user_terms OWNER to postgres;
CREATE TABLE public.student_baselines ( id uuid NOT NULL DEFAULT uuid_generate_v4(), age integer NOT NULL, genre baselines_genre_enum NOT NULL, grade baselines_student_grade_enum NOT NULL, "userId" character varying COLLATE pg_catalog."default" NOT NULL, created_at timestamp without time zone NOT NULL DEFAULT now(), updated_at timestamp without time zone NOT NULL DEFAULT now()); ALTER TABLE public.baselines OWNER to postgres;
EOSQL
