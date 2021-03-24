using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        public string Username { get; set; }

        public byte[] Password { get; set; }

        public byte[] Salt { get; set; }
    }
}