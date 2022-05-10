namespace com.marcelbenders.Aqua.Api.ErrorHandler;

public record ErrorResponse(string Message, string Errors, ErrorType Type);