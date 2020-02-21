CREATE TABLE binance (
    id              int primary key,
    price           varchar(20),
    qty             varchar(20),
    time            timestamp with time zone,
    isbuyermaker    boolean,
    isbestmatch     boolean
)
