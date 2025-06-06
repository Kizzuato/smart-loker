import LockerCard from '../components/LockerCard'
import { dummyLockers } from '@/lib/dummyLockers'

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Monitoring Loker</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dummyLockers.map(locker => (
          <LockerCard key={locker.id} locker={locker} />
        ))}
      </div>
    </div>
  )
}
