export function getBusinessTypeTid() {
    const userData = localStorage.getItem('user_data');
    if (!userData) return null;
    try {
        const user = JSON.parse(userData);
        return user?.business_id ?? null;
    } catch {
        return null;
    }
}