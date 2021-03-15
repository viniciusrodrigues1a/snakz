using System;
using System.IO;
using Microsoft.AspNetCore.Http;

namespace WebApp.Utils
{
    public class ProductFile
    {
        public readonly string FileName;

        public ProductFile(IFormFile formFile, string contentRootPath)
        {
            FileInfo fi = new FileInfo(formFile.FileName);
            this.FileName = Guid.NewGuid().ToString() + fi.Extension;
            var filePath = Path.Combine(new string[] { contentRootPath, "Uploads", this.FileName });

            using (FileStream fileStream = System.IO.File.Create(filePath))
            {
                formFile.CopyTo(fileStream);
                fileStream.Flush();
            }
        }
    }
}