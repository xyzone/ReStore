using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

var app = builder.Build();
// app.UseDeveloperExceptionPage();
app.UseMiddleware<ExceptionMiddleware>();


app.UseCors(opt =>
{
    opt.AllowAnyOrigin().AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("http://localhost:3000", "https://localhost:3000");

});

// Configure the HTTP request pipeline.
Console.WriteLine("xxxxxxx".ToString());
Console.WriteLine( app.Environment.IsDevelopment());
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
} 
// app.UseHttpsRedirection();


app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    context.Database.Migrate();
    Dbinitializer.Initialize(context);
}
catch (Exception ex)
{
    logger.LogError(ex, "A problem occued during migration");
}

app.Run();
