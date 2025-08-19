import Link from "next/link";

export default async function Home() {
  const res = await fetch("https://dummyjson.com/users", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await res.json();
  const users = data.users || [];

  return (
    <div className="container mt-4">
      <h2>All Users</h2>
      <div className="row">
        {users.map(u => (
          <div className="col-md-4 mb-3" key={u.id}>
            <Link href={`/user/${u.id}`} className="card" style={{ cursor: "pointer", display: "block" }}>
              <img src={u.image} className="card-img-top" alt={u.firstName} />
              <div className="card-body">
                <h5 className="card-title">{u.firstName} {u.lastName}</h5>
                <p className="card-text">{u.email}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
