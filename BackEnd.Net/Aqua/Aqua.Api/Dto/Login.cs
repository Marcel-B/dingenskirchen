namespace com.marcelbenders.Aqua.Api.Dto;

public record Login
{
    public string Email { get; init; }
    public string Password { get; init; }
}