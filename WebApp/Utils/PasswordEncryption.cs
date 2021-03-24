using System.Text;
using System.Security.Cryptography;

namespace WebApp.Utils
{
    public class PasswordEncryption
    {
        public static byte[] GenerateSalt()
        {
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            byte[] buffer = new byte[512];
            rng.GetBytes(buffer);

            return buffer;
        }

        public static byte[] GenerateHash(string value, byte[] salt)
        {
            return GenerateHash(Encoding.UTF8.GetBytes(value), salt);
        }

        private static byte[] GenerateHash(byte[] value, byte[] salt)
        {
            byte[] saltedHash = ConcatenateByteArrays(value, salt);

            return new SHA256Managed().ComputeHash(saltedHash);
        }

        private static byte[] ConcatenateByteArrays(byte[] arr1, byte[] arr2)
        {
            byte[] concatenated = new byte[arr1.Length + arr2.Length];
            arr1.CopyTo(concatenated, 0);
            arr2.CopyTo(concatenated, arr1.Length);

            return concatenated;
        }

        public static bool IsStringEqualToHash(string value, byte[] hash, byte[] salt)
        {
            var passwordHash = GenerateHash(Encoding.UTF8.GetBytes(value), salt);

            return CompareByteArrays(passwordHash, hash);
        }

        private static bool CompareByteArrays(byte[] arr1, byte[] arr2)
        {
            if (arr1.Length != arr2.Length)
            {
                return false;
            }

            for (int i = 0; i < arr1.Length; i++)
            {
                if (arr1[i] != arr2[i])
                {
                    return false;
                }
            }

            return true;
        }
    }
}