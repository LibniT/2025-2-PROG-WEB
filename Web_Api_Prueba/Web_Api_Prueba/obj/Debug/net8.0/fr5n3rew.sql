IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
CREATE TABLE [Personas] (
    [Id] int NOT NULL IDENTITY,
    [Nombre] nvarchar(max) NOT NULL,
    [Apellido] nvarchar(max) NOT NULL,
    [Edad] int NOT NULL,
    CONSTRAINT [PK_Personas] PRIMARY KEY ([Id])
);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251010181154_Inicial', N'9.0.9');

ALTER TABLE [Personas] ADD [Email] nvarchar(max) NOT NULL DEFAULT N'';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251010182452_Add_Email', N'9.0.9');

DECLARE @var sysname;
SELECT @var = [d].[name]
FROM [sys].[default_constraints] [d]
INNER JOIN [sys].[columns] [c] ON [d].[parent_column_id] = [c].[column_id] AND [d].[parent_object_id] = [c].[object_id]
WHERE ([d].[parent_object_id] = OBJECT_ID(N'[Personas]') AND [c].[name] = N'Edad');
IF @var IS NOT NULL EXEC(N'ALTER TABLE [Personas] DROP CONSTRAINT [' + @var + '];');
ALTER TABLE [Personas] DROP COLUMN [Edad];

ALTER TABLE [Personas] ADD [Password] nvarchar(max) NOT NULL DEFAULT N'';

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251015234134_AddPasswordAndDeletedAge', N'9.0.9');

CREATE TABLE [Metas] (
    [Id] int NOT NULL IDENTITY,
    [Nombre] nvarchar(max) NOT NULL,
    [MontoObjetivo] decimal(18,2) NOT NULL,
    [MontoActual] decimal(18,2) NOT NULL,
    [FechaCreacion] datetime2 NOT NULL,
    [FechaLimite] datetime2 NULL,
    [Completada] bit NOT NULL,
    CONSTRAINT [PK_Metas] PRIMARY KEY ([Id])
);

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20251024063749_Add_Metas', N'9.0.9');

COMMIT;
GO

