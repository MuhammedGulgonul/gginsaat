import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const projectCount = await prisma.project.count();
  const apartmentCount = await prisma.apartment.count();

  return (
    <div>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Yönetim Paneli</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Gülgönül İnşaat sistem özetiniz.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--secondary-color)' }}>{projectCount}</h3>
          <p style={{ fontWeight: '500' }}>Toplam Proje</p>
        </div>
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '2rem', color: 'var(--secondary-color)' }}>{apartmentCount}</h3>
          <p style={{ fontWeight: '500' }}>Toplam Daire</p>
        </div>
      </div>
    </div>
  );
}
