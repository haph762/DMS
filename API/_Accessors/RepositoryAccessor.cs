
// using API._Repositories.Interfaces;
// using API._Repositories.Repositories;
// using API.Data;
// using Microsoft.EntityFrameworkCore.Storage;

// namespace API._Repositories
// {
//     public class RepositoryAccessor : IRepositoryAccessor
//     {
//         private DBContext _context;
//         public RepositoryAccessor(DBContext context)
//         {
//             _context = context;

//             // AccountCash = new AccountCashRepository(_context);
//         }

//         // public IAccountCashRepository AccountCash { get; private set; }

//         public async Task<bool> SaveChangesAsync()
//         {
//             return await _context.SaveChangesAsync() > 0;
//         }

//         public async Task<IDbContextTransaction> BeginTransactionAsync()
//         {
//             return await _context.Database.BeginTransactionAsync();
//         }
//     }
// }