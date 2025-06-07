import LockerCard from '../components/LockerCard'
import { dummyLockers } from '@/lib/dummyLockers'
import ProductTable from '../components/table'

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">List Loker</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {dummyLockers.map(locker => (
          <LockerCard key={locker.id} locker={locker} />
        ))}
      </div>
      <div className="flex justify-between">
        <div className="text-2xl font-semibold mb-2 mt-2">Tabel Aktifitas Loker 1</div>
      </div>
      <div>
        <ProductTable>
        </ProductTable>
      </div>
    </div>
  )
}
