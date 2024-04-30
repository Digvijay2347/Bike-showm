<?php
// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Retrieve login credentials from POST data
  $email = $_POST['email'];
  $password = $_POST['password'];
  
  // Check against database or other authentication method
  // For simplicity, let's assume a hardcoded email and password
  $validEmail = 'user@example.com';
  $validPassword = 'password123';
  
  if ($email === $validEmail && $password === $validPassword) {
    // Login successful
    $response = array('success' => true);
  } else {
    // Login failed
    $response = array('success' => false, 'message' => 'Invalid email or password');
  }
  
  // Return JSON response
  header('Content-Type: application/json');
  echo json_encode($response);
}
?>
