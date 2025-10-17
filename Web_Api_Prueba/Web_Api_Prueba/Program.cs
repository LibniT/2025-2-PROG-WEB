using Microsoft.EntityFrameworkCore;
using Web_Api_Prueba.Data;

var builder = WebApplication.CreateBuilder(args);

// DB
var cadenaConexion = builder.Configuration.GetConnectionString("CadenaConexion");
builder.Services.AddDbContext<ConexionContext>(options => options.UseSqlServer(cadenaConexion));

// ✅ CORS
const string CorsPolicy = "FrontendPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
    {
        policy
            .WithOrigins("http://localhost:5173") // tu app Vite/React
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
