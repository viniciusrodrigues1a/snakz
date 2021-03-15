using Xunit;
using System.IO;
using System;
using Microsoft.AspNetCore.Http;
using WebApp.Utils;

namespace Tests.UnitTests
{
    public class ProductFileTests : IDisposable
    {
        private readonly IFormFile _formFile;
        private readonly string _uploadsDirPath;

        public ProductFileTests()
        {
            _uploadsDirPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

            if (!Directory.Exists(_uploadsDirPath))
            {
                Directory.CreateDirectory(_uploadsDirPath);
            }

            var fileName = "testfile.txt";
            var fileStream = new FileStream(fileName, FileMode.Create);
            _formFile = new FormFile(fileStream, 0, fileStream.Length, null, fileName)
            {
                Headers = new HeaderDictionary(),
                ContentType = "text/html"
            };
        }

        [Fact]
        public void ProductFile_IsTextFile_CreatesFile()
        {
            var productFile = new ProductFile(_formFile, Directory.GetCurrentDirectory());

            var filePath = Path.Combine(_uploadsDirPath, productFile.FileName);
            var fileExists = File.Exists(filePath);
            Console.WriteLine(filePath);
            Assert.True(fileExists);
        }

        public void Dispose()
        {
            if (Directory.Exists(_uploadsDirPath))
            {
                Directory.Delete(_uploadsDirPath, true);
            }
        }
    }
}