using System.ComponentModel.DataAnnotations;

namespace WebApp.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        [MaxLength(60, ErrorMessage = "Este campo deve conter entre 3 e 40 caracteres")]
        [MinLength(3, ErrorMessage = "Este campo deve conter entre 3 e 40 caracteres")]
        public string Title { get; set; }
        
        [Required(ErrorMessage = "Este campo é obrigatório")]
        [MaxLength(512, ErrorMessage = "Este campo deve conter no máximo 512 caracteres")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Este campo é obrigatório")]
        [Range(1, int.MaxValue, ErrorMessage = "O preço deve ser maior que 0")]
        public int Price { get; set; }
    }
}
