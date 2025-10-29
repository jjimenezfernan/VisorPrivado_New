import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Stack,
  TextField,
  Alert,
  Snackbar,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { tokens } from "../../theme";
import { motion } from "framer-motion";
import SubUpBar from "../global/SubUpBar";
import { Autocomplete } from "@mui/material";


const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";
const EMSV_URL = `${API_BASE}/api/visor_emsv`;

function ActualizarCELS() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [form, setForm] = useState({
    nombre: "",
    street_norm: "",
    number_norm: "",
    reference: "",
    auto_CEL: 1,
  });

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });
  const onCloseSnack = () => setSnack((s) => ({ ...s, open: false }));

  // ---- Direcciones EMSV ----
  const [jsonRef, setJsonRef] = useState(null);
  const [streets, setStreets] = useState([]);
  const [numbers, setNumbers] = useState([]);

  // Cargar dataset de calles/números al montar
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(EMSV_URL);
        const data = res.data;
        const ref = data.json_emsv_calle_num_reference || {};
        setJsonRef(ref);
        const calleList = Object.keys(ref || {});
        setStreets(calleList.sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" })));
      } catch (err) {
        console.error("Error cargando calles:", err);
      }
    })();
  }, []);

  // Actualizar números cuando cambia la calle seleccionada
  useEffect(() => {
    if (!form.street_norm || !jsonRef) return;
    const nums = Object.keys(jsonRef[form.street_norm] || {});
    setNumbers(nums.sort((a, b) => parseInt(a) - parseInt(b)));
  }, [form.street_norm, jsonRef]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.nombre.trim()) return "El nombre es obligatorio.";
    if (!form.street_norm.trim()) return "La calle (street_norm) es obligatoria.";
    if (!String(form.number_norm).trim() || Number.isNaN(Number(form.number_norm)))
      return "El número (number_norm) debe ser un entero.";
    if (!form.reference.trim()) return "La referencia es obligatoria.";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) return setSnack({ open: true, msg: err, severity: "error" });

    try {
      setLoading(true);
      await axios.post(`${API_BASE}/cels`, {
        nombre: form.nombre.trim(),
        street_norm: form.street_norm,
        number_norm: Number(form.number_norm),
        reference: form.reference.trim(),
        auto_CEL: Number(form.auto_CEL),
      });
      setSnack({ open: true, msg: "CELS registrado correctamente.", severity: "success" });
      setForm({ nombre: "", street_norm: "", number_norm: "", reference: "", auto_CEL: 1 });
    } catch (error) {
      let msg = "Error en el servidor.";
      if (error.response?.status === 403) msg = "La API está en modo solo lectura (READ_ONLY).";
      else if (error.response?.status === 409) msg = "Ya existe un registro con esa referencia.";
      else if (error.response?.data?.detail) msg = error.response.data.detail;
      setSnack({ open: true, msg, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <SubUpBar
        title="Registrar CELS"
        crumbs={[
          ["Inicio", "/"],
          ["Actualización de datos", "/actualizar-archivos"],
          ["Registrar CELS", "/cels/nuevo"],
        ]}
        info={{
          title: "Alta de autoconsumos (CELS)",
          description: (
            <Typography variant="h5" sx={{ color: colors.gray[400] }}>
              Introduce la información del CELS para añadirlo a la base de datos.
            </Typography>
          ),
        }}
      />

      <Box m="10px">
        <Paper
          elevation={3}
          sx={{ p: 2.5, backgroundColor: colors.gray[900], borderRadius: 2 }}
        >
          <Typography
            variant="h6"
            sx={{ mb: 2, color: colors.gray[200], fontWeight: 700 }}
          >
            Formulario de registro
          </Typography>

          {/* --- Nombre --- */}
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
            />
          </Stack>

          {/* --- Calle y número --- */}
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }} sx={{ mt: 2 }}>

            <Autocomplete
              fullWidth
              options={streets}
              value={form.street_norm || null}
              onChange={(_e, newValue) =>
                setForm((f) => ({ ...f, street_norm: newValue || "", number_norm: "" }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Calle"
                  placeholder="Escribe para buscar..."
                  variant="outlined"
                />
              )}
              
              disableClearable={false}
              
            />



            <FormControl fullWidth disabled={!form.street_norm}>
              <InputLabel>Número</InputLabel>
              <Select
                name="number_norm"
                value={form.number_norm}
                label="Número"
                onChange={(e) =>
                  setForm((f) => ({ ...f, number_norm: e.target.value }))
                }
              >
                {numbers.map((n) => (
                  <MenuItem key={n} value={n}>
                    {n}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          {/* --- Referencia y tipo --- */}
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Referencia"
              name="reference"
              value={form.reference}
              onChange={handleChange}
              placeholder="7326410VK3672N"
            />
            <FormControl fullWidth>
              <InputLabel id="auto-cel-label">Tipo de proyecto</InputLabel>
              <Select
                labelId="auto-cel-label"
                name="auto_CEL"
                value={form.auto_CEL}
                label="Tipo de proyecto"
                onChange={(e) =>
                  setForm((f) => ({ ...f, auto_CEL: e.target.value }))
                }
              >
                <MenuItem value={1}>CEL</MenuItem>
                <MenuItem value={2}>Autoconsumo compartido</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* --- Botones --- */}
          <Box mt={3} display="flex" gap={1.5}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setForm({
                  nombre: "",
                  street_norm: "",
                  number_norm: "",
                  reference: "",
                  auto_CEL: 1,
                })
              }
              disabled={loading}
            >
              Limpiar
            </Button>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={snack.open}
        autoHideDuration={3500}
        onClose={onCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={onCloseSnack}
          severity={snack.severity}
          sx={{ width: "100%" }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </motion.div>
  );
}

export default ActualizarCELS;
