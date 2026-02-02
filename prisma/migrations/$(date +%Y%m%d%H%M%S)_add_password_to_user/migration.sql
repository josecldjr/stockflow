-- AlterTable
ALTER TABLE "users" ADD COLUMN "password" TEXT NOT NULL DEFAULT 'temp_password_change_me';

-- AlterTable: Remove default after adding column
ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT;


