const API = '/api';
const opts = { credentials: 'include' };

async function req(url, options = {}) {
  const res = await fetch(`${API}${url}`, { ...opts, ...options, headers: { 'Content-Type': 'application/json', ...options.headers } });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data.data;
}

export const fetchClinics = () => req('/clinics').then((d) => d.clinics);
export const fetchClinic = (id) => req(`/clinics/${id}`).then((d) => d.clinic);
export const fetchClinicSlots = (id, date) => req(`/clinics/${id}/slots?date=${date}`).then((d) => d.slots);

export const fetchOwnerAppointments = () => req('/appointments/owner').then((d) => d.appointments);
export const fetchClinicAppointments = () => req('/appointments/clinic').then((d) => d.appointments);
export const bookAppointment = (body) => req('/appointments', { method: 'POST', body: JSON.stringify(body) }).then((d) => d.appointment);
export const updateAppointmentStatus = (id, status) => req(`/appointments/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }).then((d) => d.appointment);

export const fetchTimeline = (petId) => req(`/medical/pets/${petId}/timeline`).then((d) => d.timeline);
export const fetchPrescriptions = (petId) => req(`/medical/pets/${petId}/prescriptions`).then((d) => d.prescriptions);
export const fetchDocuments = (petId) => req(`/medical/pets/${petId}/documents`).then((d) => d.documents);
export const uploadDocument = (petId, body) => req(`/medical/pets/${petId}/documents`, { method: 'POST', body: JSON.stringify({ petId, ...body }) }).then((d) => d.document);
export const createDiagnosis = (body) => req('/medical/diagnoses', { method: 'POST', body: JSON.stringify(body) }).then((d) => d.diagnosis);
export const createPrescription = (body) => req('/medical/prescriptions', { method: 'POST', body: JSON.stringify(body) }).then((d) => d.prescription);
export const createReminder = (body) => req('/medical/reminders', { method: 'POST', body: JSON.stringify(body) });
export const fetchReminders = () => req('/medical/reminders').then((d) => d.reminders);
export const fetchTasks = () => req('/medical/tasks').then((d) => d.tasks);
export const updateTaskStatus = (id, status) => req(`/medical/tasks/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }).then((d) => d.task);
export const fetchPatients = () => req('/medical/patients').then((d) => d.patients);
export const searchPatients = (q) => req(`/medical/search/patients?q=${encodeURIComponent(q)}`).then((d) => d.patients);
