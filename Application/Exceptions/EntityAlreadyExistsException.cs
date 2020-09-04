using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Exceptions
{
    public class EntityAlreadyExistsException : Exception 
    {
        public string  EntityName { get; set; }

        public EntityAlreadyExistsException(string entityName, string message) : base(message)
        {
            EntityName = entityName;
        }
    }
}
