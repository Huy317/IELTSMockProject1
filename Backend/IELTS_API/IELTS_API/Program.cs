//using IELTS_API.Contexts;
using IELTS_API.Contexts;
using IELTS_API.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
//builder.Services.AddDbContext<TestContext>(options =>
//    options.UseInMemoryDatabase("ielts_db"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add MySQL provider
builder.Services.AddDbContext<TestContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("TestDB"),
        new MySqlServerVersion(new Version(8, 0, 42))
    )
);
builder.Services.AddDbContext<CategoryContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("CategoryDB"),
        new MySqlServerVersion(new Version(8, 0, 42))
    )
);

builder.Services.AddScoped<TestService>();
builder.Services.AddScoped<CategoryService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Enable middleware
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
    c.RoutePrefix = string.Empty; // Optional: makes Swagger UI the default page
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
