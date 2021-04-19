using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public class Discount
    {
        [Key]
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Este campo é obrigatório")]
        public int Amount { get; set;  }
        
        [Required(ErrorMessage = "Este campo é obrigatório")]
        public int ProductId { get; set; }
        
        public Product Product { get; set; }
    }
}