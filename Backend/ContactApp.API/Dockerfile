FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ["Backend/ContactApp.API/ContactApp.API.csproj", "Backend/ContactApp.API/"]
COPY ["Backend/ContactApp.Core/ContactApp.Core.csproj", "Backend/ContactApp.Core/"]
COPY ["Backend/ContactApp.Infrastructure/ContactApp.Infrastructure.csproj", "Backend/ContactApp.Infrastructure/"]

RUN dotnet restore "Backend/ContactApp.API/ContactApp.API.csproj"

# Copy the rest of the code
COPY . .

WORKDIR "/src/Backend/ContactApp.API"
RUN dotnet publish "ContactApp.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "ContactApp.API.dll"]