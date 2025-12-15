FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["IELTS_PRACTICE.csproj", "./"]
RUN dotnet restore "IELTS_PRACTICE.csproj"
COPY . .
RUN dotnet build "IELTS_PRACTICE.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "IELTS_PRACTICE.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IELTS_PRACTICE.dll"]

# base image for build
# .csproj file store list of library, so if they don't change, docker will pass this step
# if they do change, it will re-download the libraries\
# Build and publish
# after restore, copy all source code
# -c remove unnecessary debug. -o tell docker to place build output in /app/build

# pack the code is complied and needed library into folder

# runtime stage
# change to aspnet image (only runtime environment instead of SDK) more lighter
# copy from "publish" stage, copy all files from /app/publish to current folder
