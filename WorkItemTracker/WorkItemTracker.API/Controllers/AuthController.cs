using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WorkItemTracker.API.Controllers
    {
    [Route("api/v1/auth")]
    [ApiController]
    public class AuthController : ControllerBase
        {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration config) => _config = config;

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginDto dto)
            {
            var configUser = _config["Auth:DemoUser:Username"];
            var configPassword = _config["Auth:DemoUser:Password"];

            if (dto.Username != configUser || dto.Password != configPassword)
                return Unauthorized(new { error = "Invalid credentials" });

            var secretKey = _config["JwtSettings:SecretKey"];
            var expiryHours = int.Parse(_config["JwtSettings:ExpiryHours"]);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
                {
                Subject = new ClaimsIdentity(
                    new[] { new Claim(ClaimTypes.Name, dto.Username) }),
                Expires = DateTime.UtcNow.AddHours(expiryHours),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
                };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new { token = tokenHandler.WriteToken(token) });
            }
        }

    public record LoginDto(string Username, string Password);
    }