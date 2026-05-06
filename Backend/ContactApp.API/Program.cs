using ContactApp.API.Middleware;
using ContactApp.Core.Interfaces;
using ContactApp.Infrastructure.Data;
using ContactApp.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


// =========================
// Services
// =========================

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title = "ContactApp API",
        Version = "v1"
    });
});


// =========================
// Database Configuration
// =========================

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));


// =========================
// Dependency Injection
// =========================

builder.Services.AddScoped<IContactRepository, ContactRepository>();


// =========================
// CORS Configuration
// =========================

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy
                .WithOrigins(
                    "https://mock-hackathon-hcl-dotnet-six.vercel.app"
                )
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});


// =========================
// Build App
// =========================

var app = builder.Build();


// =========================
// Middleware Pipeline
// =========================

// Global Exception Middleware
app.UseMiddleware<ExceptionMiddleware>();


// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// HTTPS Redirection
app.UseHttpsRedirection();


// CORS
app.UseCors("AllowFrontend");


// Authorization
app.UseAuthorization();


// Map Controllers
app.MapControllers();


// Run App
app.Run();