using Xunit;
using WebApp.Utils;

namespace Tests.UnitTests
{
    public class PasswordEncryptionTests
    {
        [Fact]
        public void IsStringEqualToHash_SamePasswordAndSalt_ReturnsTrue()
        {
            byte[] salt = PasswordEncryption.GenerateSalt();
            byte[] hash = PasswordEncryption.GenerateHash("pa55word", salt);

            var isEqual = PasswordEncryption.IsStringEqualToHash("pa55word", hash, salt);

            Assert.True(isEqual);
        }

        [Fact]
        public void IsStringEqualToHash_SamePasswordDifferentSalt_ReturnsTrue()
        {
            byte[] salt1 = PasswordEncryption.GenerateSalt();
            byte[] hash = PasswordEncryption.GenerateHash("pa55word", salt1);

            byte[] salt2 = PasswordEncryption.GenerateSalt();
            var isNotEqual = PasswordEncryption.IsStringEqualToHash("pa55word", hash, salt2);

            Assert.False(isNotEqual);
        }

        [Fact]
        public void IsStringEqualToHash_DifferentPasswordSameSalt_ReturnsFalse()
        {
            byte[] salt = PasswordEncryption.GenerateSalt();
            byte[] hash = PasswordEncryption.GenerateHash("pa55word", salt);

            var isNotEqual = PasswordEncryption.IsStringEqualToHash("an0therpa55word", hash, salt);

            Assert.False(isNotEqual);
        }

        [Fact]
        public void IsStringEqualToHash_DifferentPasswordAndSalt_ReturnsFalse()
        {
            byte[] salt1 = PasswordEncryption.GenerateSalt();
            byte[] hash = PasswordEncryption.GenerateHash("pa55word", salt1);

            byte[] salt2 = PasswordEncryption.GenerateSalt();
            var isNotEqual = PasswordEncryption.IsStringEqualToHash("an0therpa55word", hash, salt2);

            Assert.False(isNotEqual);
        }
    }
}