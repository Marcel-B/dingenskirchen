using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace com.marcelbenders.Aqua.Domain;

public class AppUser : IdentityUser
{
    public string DisplayName { get; set; } 
}