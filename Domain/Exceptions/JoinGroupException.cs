using System;
using System.IO;

namespace Domain.Exceptions
{
    public class JoinGroupException : Exception
    {
        public JoinGroupException(string message) : base(message)
        {
            
        }
    }
}