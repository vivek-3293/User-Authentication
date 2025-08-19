export const revalidate = 0;

export default async function UserDetails({ params }) {
    const { id } = await params;

    const res = await fetch(`https://dummyjson.com/users/${id}`);

    if (!res.ok) {
        return <div className="text-center py-5">Failed to load user.</div>;
    }

    const user = await res.json();

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column mt-4">
            <h2>{user.firstName} {user.lastName}</h2>
            <img src={user.image} alt={user.firstName} />
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
        </div>
    );
}