FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
ENV ASPNETCORE_URLS=http://+:3080
EXPOSE 3080

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Controlls.Api/Controlls.Api.csproj", "Controlls.Api/"]
RUN dotnet restore "Controlls.Api/Controlls.Api.csproj"
COPY . .
WORKDIR "/src/Controlls.Api"
RUN dotnet build "Controlls.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Controlls.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Controlls.Api.dll"]
# docker buildx build -f Dockerfile --platform linux/amd64 --push -t  millegalb/form-controlls:1.0.2 .