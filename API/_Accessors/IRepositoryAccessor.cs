using Microsoft.EntityFrameworkCore.Storage;

namespace API._Repositories
{
    public interface IRepositoryAccessor
    {
        // public IAccountCashRepository AccountCash { get; }
        
        Task<bool> SaveChangesAsync();

        Task<IDbContextTransaction> BeginTransactionAsync();
    }
}