CREATE TABLE "linksTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"link" varchar(255) NOT NULL,
	"short_link" varchar(100),
	CONSTRAINT "linksTable_short_link_unique" UNIQUE("short_link")
);
