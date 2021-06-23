FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /src
COPY ["EmployeeManager.API/EmployeeManager.API.csproj", "EmployeeManager.API/"]
RUN dotnet restore "EmployeeManager.API/EmployeeManager.API.csproj"
COPY . .
WORKDIR "/src/EmployeeManager.API"
RUN dotnet build "EmployeeManager.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "EmployeeManager.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "EmployeeManager.API.dll"]
