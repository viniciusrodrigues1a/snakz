using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public class Discount
    {
        [Key]
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Este campo é obrigatório")]
        [Range(1, int.MaxValue, ErrorMessage = "O preço deve ser maior que 0")]
        public int Amount { get; set;  }
        
        [Required(ErrorMessage = "Este campo é obrigatório")]
        public int ProductId { get; set; }
        
        [Required(ErrorMessage = "Este campo é obrigatório")]
        public Product Product { get; set; }
    }
}