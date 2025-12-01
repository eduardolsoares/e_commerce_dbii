CREATE SCHEMA IF NOT EXISTS "public";

CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');
CREATE TYPE "public"."Status" AS ENUM ('PAID', 'SHIPPED', 'DELIVERED');

CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'USER',
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);


CREATE TABLE "public"."Product" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."Account" (
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

CREATE TABLE "public"."Session" (
    "id" SERIAL NOT NULL,
    "session_token" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

CREATE TABLE "public"."Order" (
    "id" SERIAL NOT NULL,
    "status" "public"."Status" NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "public"."OrderProduct" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "purchasedPrice" DOUBLE PRECISION NOT NULL,
    "color" TEXT,
    "size" TEXT,

    CONSTRAINT "OrderProduct_pkey" PRIMARY KEY ("id")
);


CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
CREATE UNIQUE INDEX "Session_session_token_key" ON "public"."Session"("session_token");
CREATE UNIQUE INDEX "OrderProduct_orderId_productId_key" ON "public"."OrderProduct"("orderId", "productId");

ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."OrderProduct" ADD CONSTRAINT "OrderProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "public"."Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."OrderProduct" ADD CONSTRAINT "OrderProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE OR REPLACE FUNCTION "UpdateProductStatusOnOrder"()
RETURNS TRIGGER AS $$
BEGIN
    -- Atualizar status do produto para SOLD quando um pedido for feito
    UPDATE "Product"
    SET "orderId" = NEW.id
    FROM "orderProduct"
    WHERE "Product".id = "orderProduct"."productId"
    AND "orderProduct"."orderId" = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER "trigger_update_product_on_order"
AFTER INSERT ON "Order"
FOR EACH ROW
EXECUTE FUNCTION "UpdateProductStatusOnOrder"();


-- View para analytics do usuário
CREATE VIEW "UserOrderSummary" AS
SELECT
    u.id as user_id,
    u.name as user_name,
    u.email,
    COUNT(o.id) as total_orders,
    COALESCE(SUM(op.quantity * op.), 0) as total_spent,
    MAX(o.createdAt) as last_order_date
FROM "User" u
LEFT JOIN "Order" o ON u.id = o."userId"
LEFT JOIN "OrderProduct" op ON o.id = op."orderId"
LEFT JOIN "Product" p ON p.id
GROUP BY u.id, u.name, u.email;

-- Procedure que calcula o preço total
CREATE OR REPLACE PROCEDURE "CalculateOrderTotal"(order_id_param INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
    order_total DECIMAL;
BEGIN
    SELECT COALESCE(SUM(quantity * purchasedPrice), 0)
    INTO order_total
    FROM "orderProduct"
    WHERE "orderId" = order_id_param;
    UPDATE "Order" SET total_value = order_total WHERE id = order_id_param;
    RAISE NOTICE 'Order % total: %', order_id_param, order_total;
END;
$$;
