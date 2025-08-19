using IELTS_PRACTICE.Contexts;
using Microsoft.EntityFrameworkCore;
using IELTS_PRACTICE.Services;

namespace IELTS_PRACTICE
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
                ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

            // Register services
            builder.Services.AddScoped<UserService>();
            builder.Services.AddScoped<QuestionService>();
            builder.Services.AddScoped<StudentService>();
            builder.Services.AddScoped<TestService>();
            builder.Services.AddScoped<TestSubmissionDetailService>();
            builder.Services.AddScoped<TestSubmissionService>();
            builder.Services.AddScoped<TypeSkillService>();

            // CORS for browser to call API
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                    policy.WithOrigins("http://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.UseCors("AllowFrontend");

            app.MapControllers();

            app.Run();
        }
    }
}
