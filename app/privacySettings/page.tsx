// app/privacy-settings/page.js
export default function PrivacySettings() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">إعدادات الخصوصية</h1>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">
            تفضيلات ملفات تعريف الارتباط
          </h3>
          {/* Add cookie preference toggles here */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">تفضيلات الاتصالات</h3>
          {/* Add communication preference toggles here */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow border">
          <h3 className="text-lg font-semibold mb-4">إدارة البيانات</h3>
          {/* Add data management buttons here */}
        </div>
      </div>
    </div>
  );
}
