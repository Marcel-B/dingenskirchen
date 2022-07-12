using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using com.marcelbenders.Aqua.Api.Dto;
using com.marcelbenders.Aqua.Api.Services;
using com.marcelbenders.Aqua.Domain.Sql;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace com.marcelbenders.Aqua.Api.Controllers;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly TokenService _tokenService;

    public AccountController(
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        TokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<User>> Login(
        [FromBody, Required] Login login)
    {
        var user = await _userManager.FindByEmailAsync(login.Email);
        if (user == null)
        {
            return Unauthorized();
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, login.Password, false);
        if (result.Succeeded)
        {
            return new User
            {
                DisplayName = user.DisplayName, Image = null, Token = _tokenService.CreateToken(user),
                Username = user.UserName
            };
        }

        return Unauthorized();
    }

    [HttpPost("register")]
    public async Task<ActionResult<User>> Register([FromBody, Required] Register register)
    {
        if (await _userManager.Users.AnyAsync(x => x.Email == register.Email))
        {
            return BadRequest("Email taken");
        }

        if (await _userManager.Users.AnyAsync(x => x.UserName == register.Username))
        {
            return BadRequest("Username taken");
        }

        var user = new AppUser
        {
            DisplayName = register.DisplayName,
            Email = register.Email,
            UserName = register.Username,
        };

        var result = await _userManager.CreateAsync(user, register.Password);
        if (result.Succeeded)
        {
            return CreateUser(user);
        }

        return BadRequest("Problem registring user");
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<User>> GetCurrentUser()
    {
        var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
        return CreateUser(user);
    }

    private User CreateUser(AppUser user)
    {
        return new User
        {
            DisplayName = user.DisplayName,
            Image = null,
            Token = _tokenService.CreateToken(user),
            Username = user.UserName
        };
    }
}