using System.Net;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Diagnostics;

namespace com.marcelbenders.Aqua.Api.ErrorHandler;

public static class ErrorHandler
{
    internal static void UseErrorHandler(this IApplicationBuilder app)
    {
        app.UseExceptionHandler(builder =>
        {
            builder.Run(async context =>
            {
                var statusCode = (int) HttpStatusCode.InternalServerError;
                context.Response.StatusCode = statusCode;

                var error = context.Features.Get<IExceptionHandlerFeature>();
                if (error is not null)
                {
                    var message = string.IsNullOrWhiteSpace(error.Error.Message)
                        ? "Error"
                        : error.Error.Message;

                    ErrorResponse errorResponse;
                    errorResponse = error.Error switch
                    {
                        { } commonError => new ErrorResponse(commonError.Message, commonError.Message,
                            (int) ErrorType.Internal)
                    };
                    context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                    context.Response.AddApplicationError(message);
                    context.Response.ContentType = "application/json";
                    var response = JsonSerializer.Serialize(errorResponse);
                    await context.Response.WriteAsync(response, Encoding.UTF8);
                }
            });
        });
    }
}