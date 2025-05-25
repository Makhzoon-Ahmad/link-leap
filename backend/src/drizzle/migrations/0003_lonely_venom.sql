CREATE TABLE "UserTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	CONSTRAINT "UserTable_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "linksTable" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "linksTable" ADD CONSTRAINT "linksTable_user_id_UserTable_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."UserTable"("id") ON DELETE cascade ON UPDATE no action;