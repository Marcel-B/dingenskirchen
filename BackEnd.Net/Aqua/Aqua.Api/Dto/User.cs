namespace com.marcelbenders.Aqua.Api.Dto;

public record User
{
    public string DisplayName { get; init; }
    public string Token { get; init; }
    public string Username { get; init; }
    public string Image { get; init; }
}