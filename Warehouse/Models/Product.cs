using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Warehouse.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Column(TypeName ="nvarchar(50)")]
        public string ProductName { get; set; }

        [Column(TypeName = "bigint")]
        public long Capacity { get; set; }

        [Column(TypeName = "bigint")]
        public long Quantity { get; set; }
    }
}
