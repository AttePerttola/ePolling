using PollAPI.Controllers;
using PollAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Register PollService as a Singleton
builder.Services.AddSingleton<PollService>();

// Add CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder
            .AllowAnyOrigin()     // Allow requests from any origin
            .AllowAnyMethod()     // Allow all HTTP methods (GET, POST, PUT, DELETE)
            .AllowAnyHeader());   // Allow all headers
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Enable CORS Middleware
app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.MapControllers();
app.Run();
