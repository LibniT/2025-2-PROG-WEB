using Microsoft.EntityFrameworkCore;
using Web_Api_Prueba.Data;
using Web_Api_Prueba.Models;

var builder = WebApplication.CreateBuilder(args);

// Agregar conexión con SQL Server
builder.Services.AddDbContext<ConexionContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConexionSQL")));


// ✅ CORS
const string CorsPolicy = "FrontendPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
    {
        policy
            .WithOrigins("http://localhost:3001") // tu app Vite/React
            .AllowAnyHeader()
            .AllowAnyMethod();
        // .AllowCredentials(); // activa SOLO si usas cookies; entonces NO uses AllowAnyOrigin
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger en dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ✅ Usa CORS antes de auth y de MapControllers
app.UseCors(CorsPolicy);

app.UseAuthorization();

app.MapControllers();

app.Run();
