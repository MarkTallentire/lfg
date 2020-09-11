using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using Domain.Classes.Groups;
using Xunit;

namespace Tests.Unit
{
    public class GroupTests
    {
        [Fact]
        public void random_group_name_generates()
        {
            var groupName = Group.GenerateRandomName();
            Debug.Print(groupName);

        }
    }
}
